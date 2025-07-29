import { useState } from 'react';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface DispenseRequest {
  dosage: number;
}

interface DispenserStateRequest {
  isEnabled: boolean;
}

interface DispenserCommandRequest {
  command: 'Prime' | 'Forward' | 'Reverse';
}

const Dispense = () => {
  const [dosage, setDosage] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<'Forward' | 'Reverse' | null>(null);

  const toggleDispenserMutation = useApiMutation<DispenserStateRequest, any>({
    onSuccess: () => {
      setIsEnabled((prev) => !prev);
      setCurrentDirection(null);
    },
  });

  const dispenseMutation = useApiMutation<DispenseRequest, any>();

  const commandMutation = useApiMutation<DispenserCommandRequest, any>({
    onSuccess: (_, variables) => {
      const cmd = variables?.body?.request?.command;
      if (cmd === 'Forward' || cmd === 'Reverse') {
        setCurrentDirection(cmd);
      } else {
        setCurrentDirection(null);
      }
    },
  });

  const handleToggle = () => {
    toggleDispenserMutation.mutate({
      endpoint: '/dispenser/onoff',
      method: 'POST',
      body: { request: { isEnabled: !isEnabled } },
    });
  };

  const handleDispense = () => {
    const dosageValue = parseFloat(dosage);
    if (isNaN(dosageValue) || dosageValue <= 0) {
      toast.error('Please enter a valid dosage');
      return;
    }

    dispenseMutation.mutate({
      endpoint: '/dispenser/dispense',
      method: 'POST',
      body: { request: { dosage: dosageValue } },
    });
  };


  const handleDirectionSelect = (direction: 'Forward' | 'Reverse') => {
    setCurrentDirection(direction);
  };

  const handlePrime = () => {
    if (!currentDirection) return;
    commandMutation.mutate({
      endpoint: '/dispenser/command',
      method: 'POST',
      body: { request: { command: currentDirection } },
    });
  };

  const directionColor = (dir: 'Forward' | 'Reverse') => {
    if (currentDirection === dir) return dir === 'Forward' ? '🟢' : '🟡';
    return '⚪';
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
            Manage the dispenser's power, dosage, and direction.
          </TooltipContent>
        </Tooltip>
      </h2>

      {/* Power Toggle */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-1">
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

      {/* Dosage Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
          Dosage (mL)
          <Tooltip>
            <TooltipTrigger asChild>
              <span><Info className="w-4 h-4 text-gray-400" /></span>
            </TooltipTrigger>
            <TooltipContent>
              Set the amount to dispense in milliliters.
            </TooltipContent>
          </Tooltip>
        </label>
        <Input
          type="number"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="Enter dosage (ml)"
          step="0.1"
          min="0"
          disabled={!isEnabled}
        />
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleDispense}
          disabled={!isEnabled || dispenseMutation.isPending}
        >
          {dispenseMutation.isPending ? <span className="flex items-center gap-1"><span className="loader"></span>Dispensing...</span> : 'Dispense'}
        </Button>
        <div className="text-xs text-gray-500">Enter a positive value and press Dispense.</div>
      </div>

      {/* Direction Control */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
          Direction
          <Tooltip>
            <TooltipTrigger asChild>
              <span><Info className="w-4 h-4 text-gray-400" /></span>
            </TooltipTrigger>
            <TooltipContent>
              Set the dispenser's direction.
            </TooltipContent>
          </Tooltip>
        </span>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  className={`${
                    currentDirection === 'Forward'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-black'
                  } hover:bg-green-700`}
                  onClick={() => handleDirectionSelect('Forward')}
                  disabled={!isEnabled || commandMutation.isPending}
                >
                  <span className="flex items-center gap-1">🟢 Forward</span>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {!isEnabled ? 'Turn on the dispenser first.' : 'Move Forward.'}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  className={`${
                    currentDirection === 'Reverse'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-black'
                  } hover:bg-yellow-600`}
                  onClick={() => handleDirectionSelect('Reverse')}
                  disabled={!isEnabled || commandMutation.isPending}
                >
                  <span className="flex items-center gap-1">🟡 Reverse</span>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {!isEnabled ? 'Turn on the dispenser first.' : 'Move Reverse.'}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Prime Button (moved after direction) */}
      <div className="flex justify-between gap-4 pt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Button
                className={`w-full bg-purple-600 hover:bg-purple-700 ${(!isEnabled || !currentDirection) ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={handlePrime}
                disabled={!isEnabled || !currentDirection || commandMutation.isPending}
              >
                Prime
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {(!isEnabled ? 'Turn on the dispenser first.' : !currentDirection ? 'Select a direction (Forward/Reverse) first.' : 'Prime the dispenser in the selected direction.')}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* LED Indicator */}
      <div className="pt-2 text-sm font-medium text-gray-700 flex items-center gap-2">
        Current Direction:
        <span className="inline-flex items-center gap-1">
          {currentDirection === null ? '⚪ Idle' : `${directionColor(currentDirection)} ${currentDirection}`}
        </span>
      </div>
    </div>
  );
};

export default Dispense;
