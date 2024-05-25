

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto w-4/12 mt-10">
            <p className="text-yellow-500 text-center text-lg mb-2">... {subHeading} ...</p>
            <p className=" text-center text-5xl font-bold mb-5 uppercase border-y-4 py-4">{heading}</p>
        </div>
    );
};

export default SectionTitle;