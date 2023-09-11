import {
    RadialBarChart,
    RadialBar,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const RadialGraph = ({ handleClick, soloData }) => {
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
            fill: "rgb(136, 132, 216)",
        });
    });

    const styleE = {
        top: "50%",
        right: "15%",
        transform: "translate(0, -50%)",
        lineHeight: "24px",
    };

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="90%"
                    barSize={15}
                    data={data}
                >
                    <Tooltip content={<CustomTooltip />} />

                    <RadialBar
                        minAngle={15}
                        label={{ position: "bottom", fill: "#111" }}
                        background
                        clockWise
                        dataKey="amount"
                        onClick={(e) => handleClick(e)}
                    />
                    {/* <Legend
                        iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={styleE}
                    /> */}
                </RadialBarChart>
            </ResponsiveContainer>
        </>
    );
};

export default RadialGraph;
