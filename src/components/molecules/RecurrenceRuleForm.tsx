'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@src/components/atoms/button"
import { Input } from "@src/components/atoms/input"
import { Label } from "@src/components/atoms/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/atoms/select"
import { Checkbox } from "@src/components/atoms/checkbox"
import { RadioGroup, RadioGroupItem } from "@src/components/atoms/radio-group"
import { format, getDay, getDate, getDaysInMonth } from 'date-fns'
import { Routine } from '@src/lib/types'

type RecurrenceRuleFormProps = {
  initialRoutine?: Routine | null;
  selectedDate?: Date | null;
  onSubmit: (routine: Routine) => void;
  onCancel?: () => void;
}

export function RecurrenceRuleForm({
  initialRoutine,
  selectedDate,
  onSubmit,
  onCancel
}: RecurrenceRuleFormProps) {
  const [intervalNumber, setIntervalNumber] = useState(initialRoutine?.interval.number || 1);
  const [intervalUnit, setIntervalUnit] = useState<'day' | 'week' | 'month' | 'year'>(
    initialRoutine?.interval.unit || 'day'
  );
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>(initialRoutine?.weekDays || []);
  const [monthOption, setMonthOption] = useState<'day' | 'weekday'>('day');
  const [selectedMonthDay, setSelectedMonthDay] = useState(
    initialRoutine?.monthDay || 
    (selectedDate ? getDate(selectedDate).toString() : '1')
  );
  const [selectedMonthWeek, setSelectedMonthWeek] = useState<'First' | 'Second' | 'Third' | 'Fourth' | 'Last'>(
    initialRoutine?.monthWeek as 'First' | 'Second' | 'Third' | 'Fourth' | 'Last' || 'First'
  );
  const [selectedMonthWeekDay, setSelectedMonthWeekDay] = useState(initialRoutine?.monthWeekDay || 'Sun');
  const [routineStarts, setRoutineStarts] = useState(initialRoutine?.starts || format(new Date(), 'yyyy-MM-dd'));
  const [routineEndsType, setRoutineEndsType] = useState(initialRoutine?.ends.type || 'never');
  const [routineEndsValue, setRoutineEndsValue] = useState(initialRoutine?.ends.value || '');

  useEffect(() => {
    if (selectedDate && !initialRoutine) {
      setRoutineStarts(format(selectedDate, 'yyyy-MM-dd'));

      const dayOfWeek = getDay(selectedDate);
      const dayMap: Record<number, string> = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
      };
      const dayStr = dayMap[dayOfWeek];
      if (dayStr && !selectedWeekDays.includes(dayStr)) {
        setSelectedWeekDays([dayStr]);
      }
      
      const date = getDate(selectedDate);
      const daysInMonth = getDaysInMonth(selectedDate);
      if (intervalUnit === 'month') {
        if (date >= 1 && date <= 7) {
          setSelectedMonthWeek('First');
        } else if (date >= 8 && date <= 14) {
          setSelectedMonthWeek('Second');
        } else if (date >= 15 && date <= 21) {
          setSelectedMonthWeek('Third');
        } else if (date >= 22 && date <= 28) {
          setSelectedMonthWeek('Fourth');
        } else {
          setSelectedMonthWeek('Last');
        }

        const weekdayMap: Record<number, string> = {
          0: 'Sun',
          1: 'Mon',
          2: 'Tue',
          3: 'Wed',
          4: 'Thu',
          5: 'Fri',
          6: 'Sat'
        };
        const weekdayStr = weekdayMap[getDay(selectedDate)] as "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
        if (weekdayStr) {
          setSelectedMonthWeekDay(weekdayStr);
        }

        if (date <= daysInMonth) {
          setSelectedMonthDay(date.toString());
        } else {
          setSelectedMonthDay('Last');
        }
      }
    }
  }, [selectedDate, initialRoutine, intervalUnit, selectedWeekDays]);

  useEffect(() => {
    if (intervalUnit === 'week' && selectedWeekDays.length === 0) {
      const date = new Date();
      const dayOfWeek = getDay(date);
      const dayMap: Record<number, string> = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
      };
      const dayStr = dayMap[dayOfWeek];
      if (dayStr) {
        setSelectedWeekDays([dayStr]);
      }
    }
  }, [intervalUnit, selectedWeekDays]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const routine: Routine = {
      interval: {
        number: intervalNumber,
        unit: intervalUnit
      },
      starts: routineStarts,
      ends: {
        type: routineEndsType,
        value: routineEndsValue
      },
      weekDays: intervalUnit === 'week' ? selectedWeekDays : undefined,
      monthOption: intervalUnit === 'month' ? monthOption : undefined,
      monthDay: monthOption === 'day' ? selectedMonthDay : undefined,
      monthWeek: monthOption === 'weekday' ? selectedMonthWeek : undefined,
      monthWeekDay: monthOption === 'weekday' ? selectedMonthWeekDay : undefined
    };

    onSubmit(routine);
  };

  const handleWeekDayChange = (day: string) => {
    if (selectedWeekDays.includes(day)) {
      setSelectedWeekDays(selectedWeekDays.filter(d => d !== day));
    } else {
      setSelectedWeekDays([...selectedWeekDays, day]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-6 rounded space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1">
          <Label htmlFor="intervalNumber">Every</Label>
          <Input 
            id="intervalNumber" 
            name="intervalNumber" 
            type="number" 
            min="1"
            value={intervalNumber}
            onChange={(e) => setIntervalNumber(parseInt(e.target.value))}
            required 
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="intervalUnit">Unit</Label>
          <Select 
            name="intervalUnit" 
            value={intervalUnit} 
            onValueChange={(value) => setIntervalUnit(value as "day" | "week" | "month" | "year")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {intervalUnit === 'week' && (
        <div className="grid w-full gap-1.5">
          <Label>Choose Days</Label>
          <div className="flex space-x-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <label key={day} className="flex items-center space-x-1">
                <Checkbox 
                  checked={selectedWeekDays.includes(day)}
                  onCheckedChange={() => handleWeekDayChange(day)}
                  aria-label={day}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {intervalUnit === 'month' && (
        <div className="grid w-full gap-1.5">
          <Label>Month Options</Label>
          <RadioGroup 
            value={monthOption} 
            onValueChange={(value) => setMonthOption(value as "day" | "weekday")} 
            className="flex space-x-4"
          >
            <label className="flex items-center space-x-1">
              <RadioGroupItem value="day" />
              <span>Day</span>
            </label>
            <label className="flex items-center space-x-1">
              <RadioGroupItem value="weekday" />
              <span>Weekday</span>
            </label>
          </RadioGroup>

          {monthOption === 'day' && (
            <div className="grid w-full gap-1.5">
              <Label htmlFor="monthDay">Day of Month</Label>
              <Select name="monthDay" value={selectedMonthDay} onValueChange={setSelectedMonthDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(31)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                  ))}
                  <SelectItem value="Last">Last Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {monthOption === 'weekday' && (
            <div className="grid w-full gap-1.5">
              <Label>Week</Label>
              <Select 
                name="monthWeek" 
                value={selectedMonthWeek} 
                onValueChange={(value) => setSelectedMonthWeek(value as "First" | "Second" | "Third" | "Fourth" | "Last")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First">First</SelectItem>
                  <SelectItem value="Second">Second</SelectItem>
                  <SelectItem value="Third">Third</SelectItem>
                  <SelectItem value="Fourth">Fourth</SelectItem>
                  <SelectItem value="Last">Last</SelectItem>
                </SelectContent>
              </Select>

              <Label>Weekday</Label>
              <Select 
                name="monthWeekDay" 
                value={selectedMonthWeekDay} 
                onValueChange={(value) => setSelectedMonthWeekDay(value as "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weekday" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sun">Sun</SelectItem>
                  <SelectItem value="Mon">Mon</SelectItem>
                  <SelectItem value="Tue">Tue</SelectItem>
                  <SelectItem value="Wed">Wed</SelectItem>
                  <SelectItem value="Thu">Thu</SelectItem>
                  <SelectItem value="Fri">Fri</SelectItem>
                  <SelectItem value="Sat">Sat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      <div className="grid w-full gap-1.5">
        <Label htmlFor="routineStarts">Starts</Label>
        <Input 
          id="routineStarts" 
          name="routineStarts" 
          type="date" 
          value={routineStarts}
          onChange={(e) => setRoutineStarts(e.target.value)}
          required 
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="routineEnds">Ends</Label>
        <Select 
          name="routineEndsType" 
          value={routineEndsType} 
          onValueChange={(value) => setRoutineEndsType(value as "never" | "on" | "after")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select end type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="on">On Date</SelectItem>
            <SelectItem value="after">After Occurrences</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {routineEndsType === 'on' && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="routineEndsValue">End Date</Label>
          <Input 
            id="routineEndsValue" 
            name="routineEndsValue" 
            type="date" 
            value={routineEndsValue}
            onChange={(e) => setRoutineEndsValue(e.target.value)}
            required 
          />
        </div>
      )}

      {routineEndsType === 'after' && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="routineEndsValue">Number of Occurrences</Label>
          <Input 
            id="routineEndsValue" 
            name="routineEndsValue" 
            type="number" 
            min="1"
            value={routineEndsValue}
            onChange={(e) => setRoutineEndsValue(e.target.value)}
            required 
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Apply
        </Button>
      </div>
    </form>
  );
} 