import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

const PieGraph = ({ handleClick, soloData }) => {
    const CustomTooltip = ({ payload, label, active }) => {
        if (active) {
            // console.log(payload);
            return (
                <div className="custom_tooltip">
                    {/* <p className="label">{`${label} : value = ${payload.value}`}</p> */}
                    {/* <p className="desc">{payload.text}</p> */}
                    <p>Категория {payload[0].payload.name}</p>
                    <p>Количество: {payload[0].payload.amount}</p>
                </div>
            );
        }

        return null;
    };
    const data = [];

    soloData.answer.map((item) => {
        return data.push({
            name: item.category_namber,
            amount: item.count,
            text: item.cluster,
            allTextData: item.cluster_answers,
        });
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
