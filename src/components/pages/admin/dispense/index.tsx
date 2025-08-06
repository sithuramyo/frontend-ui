import { useState } from 'react';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Info, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// interface DispenserStateRequest {
//   isEnabled: boolean;
// }

interface DispenserCommandRequest {
  command: 'Prime' | 'Forward' | 'Reverse';
}

const Dispense = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<'Forward' | 'Reverse' | null>(null);

  // Mutation for toggling dispenser power
  /* const toggleDispenserMutation = useApiMutation<DispenserStateRequest, any>({
    onSuccess: () => {
      setIsEnabled((prev) => !prev);
      setCurrentDirection(null);
      toast.success(isEnabled ? 'Dispenser turned OFF.' : 'Dispenser turned ON.');
    },
    onError: (error) => {
      toast.error(`Failed to toggle power: ${error.message || 'Unknown error'}`);
    }
  }); */

  // Mutation for sending Prime/Forward/Reverse commands
  const commandMutation = useApiMutation<DispenserCommandRequest, any>({
    onSuccess: (_, variables) => {
      const cmd = variables?.body?.request?.command;
      toast.success(`${cmd} command sent successfully!`);
    },
    onError: (error) => {
      toast.error(`Command failed: ${error.message || 'Unknown error'}`);
    }
  });

  const handleToggle = () => {
    // You can keep this simple state update for now
    // and uncomment the mutation when you're ready for the backend.
    setIsEnabled((prev) => !prev);
    setCurrentDirection(null); // Reset direction when power changes
    toast.success(isEnabled ? 'Dispenser turned OFF.' : 'Dispenser turned ON.');
  };

  const handlePrime = () => {
    if (!currentDirection) {
      toast.error('Please select a motor direction (Forward or Reverse) first.');
      return;
    }
    // Uncomment this when you are ready to send the command to the backend.
    /*
    commandMutation.mutate({
      endpoint: '/dispenser/command',
      method: 'POST',
      body: { request: { command: currentDirection } },
    });
    */
    // For now, just show a toast message.
    toast.success(`${currentDirection} command sent successfully!`);
  };

  return (
    <div className='w-full  mx-auto p-6 h-full flex items-center justify-center'>
      <Card className="w-3xl h-[600px] flex flex-col  justify-center mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center text-[#051463] flex items-center justify-center gap-2">
            Dispenser Control Panel
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-6 h-6 text-blue-500" />
              </TooltipTrigger>
              <TooltipContent>
                Manage the dispenser's power and motor direction.
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          <CardDescription className="text-center">
            Control the dispenser motor with precision.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Power Toggle Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <Label htmlFor="power-toggle" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              Dispenser Power
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  Turn the dispenser on or off.
                </TooltipContent>
              </Tooltip>
            </Label>
            {/* This is the new, updated part */}
            <div className="flex items-center space-x-2">
              <span className={`font-semibold transition-colors duration-200 ${isEnabled ? 'text-gray-400' : 'text-red-600'}`}>OFF</span>
              <Switch
                id="power-toggle"
                checked={isEnabled}
                onCheckedChange={handleToggle}
                // When using this with a backend, remember to use toggleDispenserMutation.isPending
                // disabled={toggleDispenserMutation.isPending}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
              />
              <span className={`font-semibold transition-colors duration-200 ${isEnabled ? 'text-green-600' : 'text-gray-400'}`}>ON</span>
            </div>
          </div>

          {/* Status Indicators Section */}
          {/* <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Status:
              <span className={`h-3 w-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-semibold">{isEnabled ? 'ON' : 'OFF'}</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              Direction:
              {currentDirection === 'Forward' && (
                <span className="flex items-center gap-1 font-semibold text-blue-600">
                  <ArrowRight className="w-4 h-4" /> Forward
                </span>
              )}
              {currentDirection === 'Reverse' && (
                <span className="flex items-center gap-1 font-semibold text-orange-600">
                  <ArrowLeft className="w-4 h-4" /> Reverse
                </span>
              )}
              {!currentDirection && (
                <span className="text-gray-500">Not Selected</span>
              )}
            </div>
          </div> */}

          <hr className="my-4" />

          {/* Motor Direction & Prime Section */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              Prime Direction
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  Select the direction for motor operations (e.g., Prime).
                </TooltipContent>
              </Tooltip>
            </Label>

            <ToggleGroup
              type="single"
              value={currentDirection || ''}
              onValueChange={(value) => setCurrentDirection(value as 'Forward' | 'Reverse')}
              disabled={!isEnabled || commandMutation.isPending}
              className="grid grid-cols-2 gap-2"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="Forward" className="flex items-center gap-2 data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:hover:bg-blue-700">
                    <ArrowRight className="w-5 h-5" /> Forward
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  {!isEnabled ? 'Turn on the dispenser first.' : 'Select Forward direction.'}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="Reverse" className="flex items-center gap-2 data-[state=on]:bg-orange-600 data-[state=on]:text-white data-[state=on]:hover:bg-orange-700">
                    <ArrowLeft className="w-5 h-5" /> Reverse
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  {!isEnabled ? 'Turn on the dispenser first.' : 'Select Reverse direction.'}
                </TooltipContent>
              </Tooltip>
            </ToggleGroup>
          </div>

          {/* Prime Button */}
          <Button
            onClick={handlePrime}
            disabled={!isEnabled || !currentDirection || commandMutation.isPending}
            className={`w-full text-lg font-bold py-6 transition-all duration-200 ${!isEnabled || !currentDirection
              ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'
              : 'bg-purple-600 hover:bg-purple-700'
              }`}
          >
            {commandMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Priming...
              </span>
            ) : (
              `Prime ${currentDirection ? currentDirection : ''}`
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dispense;