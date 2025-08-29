export default function Overview({goals}){
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
    const completed= goals.filter(g => g.savedAmount >= g.targetAmount).length;

    return (
        <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Overview</h3>
            <p>Total Goals: {totalGoals}</p>
            <p>Total Saved: {totalSaved}</p>
            <p>Completed Goals: {completed}</p>

            <div className="progress-bar" style={{ width: `${(totalSaved / totalGoals) * 100}%` }}></div>
            <p>Progress: {((totalSaved / (totalGoals || 1)) * 100).toFixed(2)}%</p>
        </div>


    );


}