import { Pie } from 'react-chartjs-2';

const BudgetChart = ({ data }) => (
  <section className="budget-chart">
    <h3>Spending by Category</h3>
    <div className="pie-chart-container">
      <Pie data={data} width={250} height={250} />
    </div>
  </section>
);

export default BudgetChart;
