import React, { useState } from 'react';

export default function DepositForm({goals, onSave, onCancel}){
    const [goalId, setGoalId] = useState(goals[0]?.id || '');
    const [amount, setAmount] = useState('');

    function handleSubmit(e) {
    e.preventDefault();
    onSave(goalId, amount);
    }

    return(
        <div className='card'>
            <h3>Deposit Funds</h3>
            <form onSubmit={handleSubmit}>
                <label>Select Goal</label>
                <select value={goalId} onChange={e => setGoalId(e.target.value)} required>
                    {goals.map(g => (<option key={g.id} value={g.id}>{g.name}</option>))}
                </select>

                <label>Deposit Amount</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />

                <button type="submit">Deposit</button>
                <button type="button" onClick={onCancel}>Cancel</button>

            </form>

        </div>

    );

}