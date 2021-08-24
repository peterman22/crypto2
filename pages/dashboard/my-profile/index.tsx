import DashboardLayout from "components/layout/Dashboard";
import { IUserProfile, IUserProfileSR } from "helpers/interfaces";
import { useRouter } from "next/router";
import React from "react";
import { FaCamera, FaCameraRetro, FaUser, FaUserCircle } from "react-icons/fa";
import { ssrCheckTokenValidity, updateProfilePicture, uploadToCloudinary } from "services";

interface IProps {
    user: IUserProfileSR;
}

export const getServerSideProps = async (context: any) => {
    const tokenValidity = await ssrCheckTokenValidity(context);
    if (tokenValidity[0] == true) {
        console.log(tokenValidity[2])
        return {
            props: {
                user: tokenValidity[2]
            },
            ...tokenValidity[1]
        }
    }
    return {
        props: {},
        ...tokenValidity[1]
    }
}

const ProfileIndexPage = (props: IProps) => {
    const router = useRouter();

    const [user, setUser] = React.useState<IUserProfile>({
        firstName: props.user.firstname,
        lastName: props.user.lastname,
        email: props.user.email,
        profileImage: props.user.image
    });
    const [image, setImage] = React.useState<File>();

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.files);
        setImage(e.currentTarget.files![0]);
    }

    const handleUpload = async () => {
        const res = await uploadToCloudinary(image);
        console.log(res);
        if (!res) return alert('An error occurred while uploading your new profile picture. Please, try again.');

        setUser({
            ...user,
            profileImage: res.url
        });
        setImage(undefined);
        await updateProfilePicture(res.url);
        router.reload();
    }

    return (
        <DashboardLayout overflow={false} user={props.user} title={`Tickers | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col items-center justify-center px-8 pt-6 h-full overflow-y-scroll`} style={{ background: `#efefef` }}>
                <div className={`w-full sm:w-8/12 bg-gray-100 border border-blue-200 flex flex-col p-6 rounded-lg`}>
                    <div className={`flex flex-row justify-center`}>
                        <div>
                            {
                                <div className={`relative`} style={{ width: 100, height: 100 }}>
                                    {
                                        !user.profileImage
                                            ?
                                            <FaUserCircle size={100} color={`grey`} />
                                            :
                                            <img style={{ height: 100, width: 100 }} className={`rounded-full`} src={user.profileImage} alt={`profile-image`} />
                                    }
                                    &nbsp;
                                    <span className={`absolute bottom-0 right-2`}>
                                        <button className="btn-no-outline">
                                            <input className={`relative top-6 z-10 cursor-pointer`} style={{ width: 21, opacity: 0 }} type={`file`} onChange={e => e.currentTarget.files!.length > 0 ? handleImage(e) : null} />
                                            <FaCamera className={`hover:text-yellow-500 text-blue-800`} size={21} />
                                        </button>
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        image && <button onClick={() => handleUpload()} className="btn-no-outline flex-none w-auto py-1 bg-green-100 text-green-500 px-4 mt-2 text-xxs rounded-md">Upload '{image!.name}'</button>
                    }
                    <div className={`mt-7`}>
                        <div className={`text-xxs uppercase text-blue-500 text-center`}>Name</div>
                        <div style={{ fontSize: 15 }} className={`uppercase text-gray-400 text-center`}>{`${user.firstName} ${user.lastName}`}</div>
                        <div className={`text-xxs uppercase mt-4 text-blue-500 text-center`}>Email</div>
                        <div style={{ fontSize: 15 }} className={`uppercase text-gray-400 text-center`}>{`${user.email}`}</div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}


export default ProfileIndexPage;