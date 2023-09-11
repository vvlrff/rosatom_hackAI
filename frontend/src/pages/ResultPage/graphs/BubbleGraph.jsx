import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ScatterChart,
    Scatter,
    ResponsiveContainer,
} from "recharts";

const BubbleGraph = () => {
    const data = [
        { x: 110, y: 100, z: 200 },
        { x: 110, y: 280, z: 200 },
    ];

    return (
        <>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                    <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="A school" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </>
    );
};

export default BubbleGraph;
