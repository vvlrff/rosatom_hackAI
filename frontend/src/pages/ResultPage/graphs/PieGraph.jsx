import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

const PieGraph = ({ handleClick, dataJSON }) => {
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
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="amount"
                        data={data}
                        fill="#8884d8"
                        label
                        onClick={(e) => handleClick(e.payload.payload)}
                    />
                                    <Tooltip content={<CustomTooltip />} />

                </PieChart>
            </ResponsiveContainer>
        </>
    );
};

export default PieGraph;
