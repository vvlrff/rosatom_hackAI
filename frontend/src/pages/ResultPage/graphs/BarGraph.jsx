import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../graph-master.css";

const BarGraph = ({ handleClick, dataJSON }) => {
    const CustomTooltip = ({ payload, label, active }) => {
        if (active) {
            return (
                <div className="custom_tooltip">
                    <p className="desc">Категория {payload[0].payload.name}</p>
                    <p className="label">{`Количество ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    const data = dataJSON.answer.map((item) => {
        return {
            name: item.cluster,
            amount: item.count,
            text: item.cluster,
            allTextData: item.cluster_answers,
        };
    });

    return (
        <>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="text" stroke="#8884d8" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="amount"
                    fill="#8884d8"
                    barSize={30}
                    onClick={(e) => handleClick(e.payload)}
                />
            </BarChart>
        </>
    );
};

export default BarGraph;
