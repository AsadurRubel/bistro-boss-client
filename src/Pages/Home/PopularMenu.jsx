import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem";
import useMenu from "../../Hooks/useMenu";

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')


    // const [menu, setMenu] = useState([])
    // console.log(menu)

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems)
    //         })
    // }, [])




    return (
        <section>
            <SectionTitle className="mb-10"
                heading="From Our Menu"
                subHeading="Popular Items"
            >
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
            <div className="text-center mb-10">
                <button className="btn btn-outline border-0 border-b-4 mt-4 ">View Full Menu</button>
            </div>

        </section>
    );
};

export default PopularMenu;