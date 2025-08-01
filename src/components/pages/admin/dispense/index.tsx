import { useState } from 'react';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

// Removed DispenseRequest as dosage is no longer used
interface DispenserStateRequest {
  isEnabled: boolean;
}

interface DispenserCommandRequest {
  command: 'Prime' | 'Forward' | 'Reverse';
}

const Dispense = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<'Forward' | 'Reverse' | null>(null);

  // Mutation for toggling dispenser power
  const toggleDispenserMutation = useApiMutation<DispenserStateRequest, any>({
    onSuccess: () => {
      setIsEnabled((prev) => !prev);
      setCurrentDirection(null); // Reset direction when power changes
      toast.success(isEnabled ? 'Dispenser turned OFF.' : 'Dispenser turned ON.');
    },
    onError: (error) => {
      toast.error(`Failed to toggle power: ${error.message || 'Unknown error'}`);
    }
  });

  // Mutation for sending Prime/Forward/Reverse commands
  const commandMutation = useApiMutation<DispenserCommandRequest, any>({
    onSuccess: (_, variables) => {
      const cmd = variables?.body?.request?.command;
      toast.success(`${cmd} command sent successfully!`);
      // For Prime, we don't necessarily want to change the selected direction state,
      // as the user might want to prime multiple times in the same direction.
      // If 'Prime' implicitly sets direction, you'd adjust this.
    },
    onError: (error) => {
      toast.error(`Command failed: ${error.message || 'Unknown error'}`);
      // Consider resetting currentDirection on error if the command invalidates the state
      // setCurrentDirection(null);
    }
  });

  const handleToggle = () => {
    toggleDispenserMutation.mutate({
      endpoint: '/dispenser/onoff',
      method: 'POST',
      body: { request: { isEnabled: !isEnabled } },
    });
  };

  const handlePrime = () => {
    if (!currentDirection) {
      toast.error('Please select a motor direction (Forward or Reverse) first.');
      return;
    }
    commandMutation.mutate({
      endpoint: '/dispenser/command',
      method: 'POST',
      body: { request: { command: currentDirection } },
    });
  };

  // Helper for consistent button styling for direction selection
  const getDirectionButtonClass = (dir: 'Forward' | 'Reverse') => {
    return currentDirection === dir
      ? dir === 'Forward' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-7 rounded-xl border border-gray-200 shadow-md bg-white">
      <h2 className="text-2xl font-bold text-[#051463] text-center flex items-center justify-center gap-2">
        Dispenser Control Panel
        <Tooltip>
          <TooltipTrigger asChild>
            <span><Info className="w-5 h-5 text-blue-500" /></span>
          </TooltipTrigger>
          <TooltipContent>
            Manage the dispenser's power and motor direction.
          </TooltipContent>
        </Tooltip>
      </h2>

      {/* Power Toggle */}
      <div className="flex justify-between items-center py-2">
        <span className="text-base font-medium flex items-center gap-1">
          Dispenser Power
          <Tooltip>
            <TooltipTrigger asChild>
              <span><Info className="w-4 h-4 text-gray-400" /></span>
            </TooltipTrigger>
            <TooltipContent>
              Turn the dispenser on or off.
            </TooltipContent>
          </Tooltip>
        </span>
        <Button
          className={isEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
          onClick={handleToggle}
          disabled={toggleDispenserMutation.isPending}
        >
          {toggleDispenserMutation.isPending
            ? <span className="flex items-center gap-1"><span className="loader"></span>Processing...</span>
            : isEnabled
              ? 'Turn Off'
              : 'Turn On'}
        </Button>
      </div>

      <hr className="my-4" />

      {/* Motor Direction Control (Toggle Group Style) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-gray-700 flex items-center gap-1">
            Motor Direction
            <Tooltip>
              <TooltipTrigger asChild>
                <span><Info className="w-4 h-4 text-gray-400" /></span>
              </TooltipTrigger>
              <TooltipContent>
                Select the direction for motor operations (e.g., Prime).
              </TooltipContent>
            </Tooltip>
          </span>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div> {/* div wrapper to allow tooltip on disabled button */}
                  <Button
                    className={`${getDirectionButtonClass('Forward')} ${!isEnabled ? 'cursor-not-allowed' : ''}`}
                    onClick={() => setCurrentDirection('Forward')}
                    disabled={!isEnabled || commandMutation.isPending}
                  >
                    <span className="flex items-center gap-1">
                      <span role="img" aria-label="blue circle">🔵</span> Forward
                    </span>
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {!isEnabled ? 'Turn on the dispenser first.' : 'Select Forward direction.'}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div> {/* div wrapper to allow tooltip on disabled button */}
                  <Button
                    className={`${getDirectionButtonClass('Reverse')} ${!isEnabled ? 'cursor-not-allowed' : ''}`}
                    onClick={() => setCurrentDirection('Reverse')}
                    disabled={!isEnabled || commandMutation.isPending}
                  >
                    <span className="flex items-center gap-1">
                      <span role="img" aria-label="orange circle">🟠</span> Reverse
                    </span>
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {!isEnabled ? 'Turn on the dispenser first.' : 'Select Reverse direction.'}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Prime Button - now explicitly tied to selected direction */}
        <div className="flex justify-center pt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button
                  className={`w-full bg-purple-600 hover:bg-purple-700 ${(!isEnabled || !currentDirection || commandMutation.isPending) ? 'opacity-60 cursor-not-allowed' : ''}`}
                  onClick={handlePrime}
                  disabled={!isEnabled || !currentDirection || commandMutation.isPending}
                >
                  {commandMutation.isPending
                    ? <span className="flex items-center gap-1"><span className="loader"></span>Priming...</span>
                    : `Prime ${currentDirection ? currentDirection : ''}`}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {(!isEnabled ? 'Turn on the dispenser first.' : !currentDirection ? 'Select a direction (Forward/Reverse) first.' : `Initiate priming in ${currentDirection} direction.`)}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <hr className="my-4" />

      {/* Status Indicators */}
      <div className="flex justify-between items-center text-sm font-medium text-gray-700">
        <span>Dispenser Status:</span>
        <span className="inline-flex items-center gap-1">
          {isEnabled ? '🟢 ON' : '🔴 OFF'}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm font-medium text-gray-700">
        <span>Selected Motor Direction:</span>
        <span className="inline-flex items-center gap-1">
          {currentDirection === null ? '⚪ None Selected' : `${currentDirection === 'Forward' ? '🔵' : '🟠'} ${currentDirection}`}
        </span>
      </div>
    </div>
  );
};

export default Dispense;