const Footer = () => {
    return (
        <div style={{height: '50px'}} className="flex items-center justify-center text-white bg-gray-700">
                &copy; {new Date().getFullYear()} Cloud Hosting by <span className="text-[#b00fb0] font-bold"> &nbsp; Moustafa Mouhamed</span>
        </div>
    )
}

export default Footer