import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage, setLanguage } from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
            return () => unsubscribe;
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate("/error");
        });
    }

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className="absolute w-screen px-4 py-4 bg-gradient-to-b from-black z-10 flex justify-between items-center">
            {/* Netflix Logo */}
            <img
                className="w-44"
                src= {LOGO}
                alt="logo"
            />

            {/* Profile + Sign Out */}
            {user && (<div className="flex items-center space-x-4">
                {showGptSearch && 
                <select className='p-2 m-2 bg-gray-900 text-white rounded-lg' onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key = {lang.identifier} value={lang.identifier}>
                            {lang.name}
                        </option>
                    ))}
                </select>}
                <button className='py-2 px-4 my-2 mx-2 bg-purple-800 text-white rounded-lg'
                onClick={handleGptSearchClick}>{showGptSearch ? "Home Page" : "GPT Search"}</button>
                <img
                    className="w-10 h-10 rounded"
                    alt="userIcon"
                    src="https://occ-0-4603-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                />
                <button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded">
                    Sign Out
                </button>
            </div>)}
        </div>
    );
};


export default Header