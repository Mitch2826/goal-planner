export default function GoalCard({goal, onEdit, onDelete}) {

    const percent = Math.min(100, (goal.savedAmount / goal.targetAmount) * 100);
    const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
    const isWarning = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;

    return(
        <div className="card">
            <h3>{goal.name}</h3>
            <p>Category: {goal.category}</p>
            <p>Deadline: {goal.deadline}</p>

            <div className="progress-bar" style={{width: `${percent}%`}}></div>
            <p>Saved: {goal.savedAmount} / {goal.targetAmount} </p>
            <p>Remaining: {goal.targetAmount - goal.savedAmount}</p>
        
            {isWarning && <p className="warning">Warning: Only {daysLeft} days left!</p>}
            {isOverdue && <p className="overdue">Overdue!</p>}

            <button className="edit-button" onClick={() => onEdit(goal.id)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(goal.id)}>Delete</button>

        </div>
    );
}