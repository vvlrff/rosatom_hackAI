import React, { useState } from "react";
import Video from "../../assets/video/video2.mp4";
import {
    VideoHeroBg,
    VideoContainer,
    VideoContent,
    VideoH1,
    VideoP,
    VideoBg,
    VideoBtnWrapper,
    Button,
    ArrowForward,
    ArrowRight,
} from "./VideoElements";

const VideoSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    return (
        <>
            <VideoContainer>
                <VideoHeroBg>
                    <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
                </VideoHeroBg>
                <VideoContent>
                    <VideoH1>
                        Улучшение представлений результатов в сервисе "Мой
                        голос"
                    </VideoH1>
                    <VideoP>Решение команды "NaturaLP"</VideoP>
                    <VideoBtnWrapper>
                        <Button
                            to="question"
                            onMouseEnter={onHover}
                            onMouseLeave={onHover}
                        >
                            <p style={{ margin: "0px" }}>Начать</p>
                            {hover ? <ArrowForward /> : <ArrowRight />}
                        </Button>
                    </VideoBtnWrapper>
                </VideoContent>
            </VideoContainer>
        </>
    );
};

export default VideoSection;
