import { useState, useEffect } from 'react'
import GoalCard from './components/GoalCard';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import './App.css'

//store API endpoint in a variable
const API= "http://localhost:3000/goals";

//get all goals
  const getGoals = () => fetch(API)
    .then(res => res.json())
    .catch(err => console.error("Error fetching goals:", err));  

//create a new goal
  const createGoal = (goal) => fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goal),
  })
  .then(res => res.json())
  .catch(err => console.error("Error creating goal:", err));

//update a goal
  const updateGoal = (id,updates) => fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',}, 
    body: JSON.stringify(updates)})
    .then(res => res.json());

//delete a goal
  const deleteGoal = (id) => fetch(`${API}/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .catch(err => console.error("Error deleting goal:", err));

function App() {
    const [goals, setGoals] = useState([]); 
    const [mode, setMode] = useState('list'); //list, add, edit, deposit
    const [selectedGoal, setSelectedGoal] = useState(null); //goal being edited or deposited into

    useEffect(() => {
      loadGoals();

    },[]);

    function loadGoals() {
      getGoals().then(setGoals);
    }
    function handleAdd(goal){
      const payload={...goal, savedAmount: 0, createdAt: new Date().toISOString()};
      createGoal(payload).then(() => {
        loadGoals();
        setMode('list');
      });
    }

    function handleEdit(id, updates){
      updateGoal(id, updates).then(() => {
        loadGoals();
        setMode('list');
        setSelectedGoal(null);
      });
    }
    function handleDelete(id){
      if(window.confirm("Are you sure you want to delete this goal?")){
        deleteGoal(id).then(() => {
          loadGoals();
        });
      }
    }

    function handleDeposit(goalId, amount){
        const goal = goals.find(g => g.id === goalId);
        const newAmount = goal.savedAmount + Number(amount);
        updateGoal(goalId, { savedAmount: newAmount }).then(() => {
          loadGoals();
          setMode('list');
          setSelectedGoal(null);
        });
    }
      
      return(
        <div className='container'>
          <h1>Goal Tracker</h1>
          {mode === 'list' && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => setMode('add')}>+ New Goal</button>
                <button onClick={() => {setMode('deposit'); setSelectedGoal(null);}}>Deposit</button>

              </div>
              <Overview goals={goals} />
              <div className="grid">
                {goals.map(goal => (
                  <GoalCard  key={goal.id} goal={goal} onEdit={(id) => {setSelectedGoal(goals.find(g => g.id === id)); setMode('edit');}} onDelete={handleDelete}
                  />
                ))}
              </div>
            </>)}

          {mode === 'add' && (<GoalForm onSave={handleAdd} onCancel={() => setMode('list')} />)}

          {mode === 'edit' && selectedGoal( <GoalForm initialData={selectedGoal} onSave={data => handleEdit(selectedGoal.id, data)}
               onCancel={() => {setMode('list'); 
                                setSelectedGoal(null);
                        }} 
          />)}

          {mode === 'deposit' && (<DepositForm goals={goals} onSave={handleDeposit} onCancel={() => setMode('list')} />)}
        </div>


        );






    


}







export default App
