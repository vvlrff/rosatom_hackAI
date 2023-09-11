import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import categoryData from "../categoryData";

const RadarGraphs = ({ handleClick }) => {
    const data = [];

    categoryData.map((item) => {
        return data.push({ name: item.category, amount: item.amount });
    });

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    {/* <PolarRadiusAxis /> */}
                    <Radar
                        name="amount"
                        dataKey="amount"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </>
    );
};

export default RadarGraphs;
