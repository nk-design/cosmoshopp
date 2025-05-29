const HeaderVideo = () => {
    return <>
        {window.innerWidth>750?<video width="100%" autoPlay loop muted playsInline>
            <source src="/video/IMG_2064.mp4" type="video/mp4" />
            <source src="/video/IMG_2064.mov" type="video/MOV" />
        </video>:<video width="100%" autoPlay loop muted playsInline>
            <source src="/video/IMG_0679.mp4" type="video/mp4" />
            <source src="/video/IMG_0679.mov" type="video/MOV" />
        </video>}
    </>
}

export default HeaderVideo;