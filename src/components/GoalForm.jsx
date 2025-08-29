import React, { useState } from 'react';


export default function GoalForm({initialData = {}, onSave, onCancel}){
    const [name, setName] = useState(initialData.name || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [targetAmount, setTargetAmount] = useState(initialData.targetAmount || '');
    const [deadline, setDeadline] = useState(initialData.deadline || '');

    function handleSubmit(e) {
        e.preventDefault();
        onSave({ name, targetAmount: Number(targetAmount), category, deadline });

    }

    return (
        <div className="card">
            <h3>{initialData.id ? 'Edit Goal' : 'New Goal'}</h3>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} required/>

                <label>Target Amount</label>
                <input type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} required />

                <label>Category</label>
                <input value={category} onChange={e => setCategory(e.target.value)} required/>

                <label>Deadline</label>
                <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} required/>

                <button type="submit">{initialData.id ? 'Update Goal' : 'Create Goal'}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>

        </div>

    );

}