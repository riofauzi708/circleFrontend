import React from 'react'; 
import { MdOutlinePersonSearch } from 'react-icons/md'; 
 
interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile?: {
      id: number;
      avatar?: string | null;
  };
}
 
const Search: React.FC<IUser> = () => { 
  const avatarDefault = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/640px-User-avatar.svg.png";

    return ( 
      <div className='border border-[#262626] h-[100vh] p-3'> 
          <form> 
              <div className='flex bg-[#262626] p-3 rounded-full mt-5'> 
                  <MdOutlinePersonSearch size={"27px"} /> 
                  <input 
                      type="text" 
                      placeholder='Search your friend' 
                      className='outline-none flex-grow bg-transparent' 
                  /> 
              </div> 
          </form> 

          <div> 
                  <div className='w-full h-[60vh] flex justify-center items-center'> 
                      <div className='text-center'> 
                          <h1 className='text-[20px] font-bold'>No results for “asmorncd”</h1> 
                          <p>Try searching for something else or check the </p> 
                          <p>spelling of what you typed.</p> 
                      </div> 
                  </div> 
                          <div className="w-280px flex justify-between gap-2 my-1 p-3"> 
                              <div className="flex gap-2"> 
                                  <img 
                                      className="h-12 w-12 rounded-full" 
                                      src={avatarDefault}
                                      alt="Avatar" 
                                  /> 
                                  <div className="flex flex-col justify-start"> 
                                      <p className="text-base">fullname</p> 
                                      <p className="text-gray-500">@username</p> 
                                  </div> 
                              </div> 

                              <button 
                                  className="border border-white mt-3 px-4 py-1 rounded-full text-sm" 
                              > 
                              </button> 
                          </div> 
          </div> 
      </div> 
  ); 
} 

export default Search;