import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

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