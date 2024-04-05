import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';

async function Page() {
    let user = null;

    user = await currentUser();


    const userInfo = {}; // Assuming userInfo should be fetched from some source, adjust as needed

    // const userData = {
    //     id: user?.id || "",
    //     objectId: userInfo?._id || "",
    //     username: userInfo ? userInfo.username :
    //     name: userInfo ? userInfo.name : user?.firstName ?? "",
    //     bio: userInfo ? userInfo.bio : "",
    //     image: userInfo ? userInfo.image : user?.imageUrl || "",
    // };


    const userData = {
        id: user.id,
        objectId: userInfo?._id,
        username: user.username,
        name: user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image:  user.imageUrl,
    };



    return (
        <main className="mx-auto flex max-w-3x1 flex-col justify-start px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">Complete your profile now to use Threads</p>
            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle="Continue"/>
            </section>
        </main>
    );
}

export default Page;
