import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/ui/password';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Auth = () => {
  const [isView, setIsView] = useState(false);
  const navigate = useNavigate();
  const centerName: string = 'YangonMental Health Hospital (DDTRU)';

  const handleLogin = () => {
    navigate('/home/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-6">
      {/* Logo */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src="/login.png"
          alt="DTIS"
          className="h-52 w-auto object-contain"
        />
        <h1 className="text-xl font-semibold text-[#051463]">
          Drug Treatment Information System
        </h1>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md border shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          {/* Centre */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Centre
            </label>
            <div className="relative">
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-700 cursor-not-allowed">
                {centerName}
              </div>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Username
            </label>
            <Input placeholder="Enter username" />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <PasswordInput
              placeholder="Enter password"
              isView={isView}
              toggleView={() => setIsView(!isView)}
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full bg-[#051463] text-white hover:bg-[#3f51b0]"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
