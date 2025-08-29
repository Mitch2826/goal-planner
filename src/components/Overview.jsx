export default function Overview({goals}){
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
    const completed= goals.filter(g => g.savedAmount >= g.targetAmount).length;
    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    const progressPercent = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    return (
        <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Overview</h3>
            <p>Total Goals: {totalGoals}</p>
            <p>Total Saved: {totalSaved}</p>
            <p>Completed Goals: {completed}</p>

            <div className="progress-bar" style={{ width: `${(totalSaved / totalGoals) * 100}%` }}></div>
            <p>Progress: {progressPercent.toFixed(2)}%</p>

        </div>


    );


}