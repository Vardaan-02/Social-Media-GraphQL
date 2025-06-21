import React, { useState } from 'react';
import { X, Camera, User as UserIcon, Users, Briefcase, ChevronRight } from 'lucide-react';
import Modal from '@/ui/components/ui/model';
import GlassCard from '@/ui/components/ui/glassyCard';
import { User } from '@/providers/stateClient/types';

interface Follower {
  id: number;
  name: string;
  avatar: string;
}

interface ProfileData {
  name: string;
  title: string;
  profilePicture: string;
  followers: Follower[];
  following: Follower[];
}

interface ProfileEditorProps {
  isOpen: boolean;
  onClose: () => void;
  user:User;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({
  isOpen,
  onClose,
  user,
}) => {
 const initialData: ProfileData = {
    name: user.name || '',
    title: user.title || '',
    profilePicture: user.profileImageURL || '',
    followers: (user.followers ?? []).map((follower, index) => ({
      id: index,
      name: follower?.name ?? '',
      avatar: follower?.profileImageURL ?? '',
    })),
    following: (user.following ?? []).map((following, index) => ({
      id: index,
      name: following?.name ?? '',
      avatar: following?.profileImageURL ?? '',
    })),
  };
  const [profileData, setProfileData] = useState<ProfileData>(initialData);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileData(prev => ({
            ...prev,
            profilePicture: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileData(prev => ({
            ...prev,
            profilePicture: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <GlassCard className="w-full max-w-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center mb-8">
            <div 
              className={`relative group w-32 h-32 rounded-full overflow-hidden border-2 
                       ${isDragging ? 'border-blue-500 bg-blue-500/20' : 'border-blue-500/30'} 
                       transition-all duration-300 animate-pulse-blue`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {profileData.profilePicture ? (
                <img 
                  src={profileData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <UserIcon size={40} className="text-gray-400" />
                </div>
              )}
              
              <label 
                htmlFor="profile-picture" 
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                         flex items-center justify-center cursor-pointer transition-all"
              >
                <Camera className="text-white" size={32} />
                <input 
                  type="file" 
                  id="profile-picture" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg">
              <UserIcon className="text-blue-400" size={24} />
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={profileData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white
                           focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg">
              <Briefcase className="text-blue-400" size={24} />
              <div className="flex-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={profileData.title} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white
                           focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4 bg-slate-800/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="text-blue-400" size={24} />
                  <h3 className="text-sm font-medium text-gray-300">Followers</h3>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {profileData.followers.map(follower => (
                    <div key={follower.id} className="flex items-center space-x-3 bg-slate-700/50 p-2 rounded-lg">
                      <img 
                        src={follower.avatar} 
                        alt={follower.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-white">{follower.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col space-y-4 bg-slate-800/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="text-blue-400" size={24} />
                  <h3 className="text-sm font-medium text-gray-300">Following</h3>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {profileData.following.map(following => (
                    <div key={following.id} className="flex items-center space-x-3 bg-slate-700/50 p-2 rounded-lg">
                      <img 
                        src={following.avatar} 
                        alt={following.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-white">{following.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-white bg-slate-700 rounded-lg
                       hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                       transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                       transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </GlassCard>
    </Modal>
  );
};

export default ProfileEditor;