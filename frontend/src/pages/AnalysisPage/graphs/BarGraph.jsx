import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
// import questionData2 from "../questionData";

import "../graph-master.css";

// ! uv - horizontal

const BarGraph = ({ handleClick, soloData }) => {
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
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="text" stroke="#8884d8" />
                {/* <YAxis /> */}
                {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
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
