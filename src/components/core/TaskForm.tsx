'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select"
import { Checkbox } from "@src/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@src/components/ui/radio-group"
import { format, getDay, getDate, getDaysInMonth } from 'date-fns'
import { Task } from '../../lib/types'
import { Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@src/components/ui/dropdown-menu"

type TaskFormProps = {
  initialTask?: Task;
  labels: string[];
  onSubmit: (taskData: Omit<Task, 'id'> & { updateType?: 'global' | 'local' }) => void;
  isToday: boolean;
  addLabel: (newLabel: string) => void;
  selectedDate?: Date | null;
  showUnplannedTasks: boolean;
  allowSelectDate?: boolean;
  deleteLabel: (label: string) => void;
  isEdit: boolean;
  onRepeatChange?: (changed: boolean) => void;
}

export function TaskForm({ 
  initialTask, 
  labels, 
  onSubmit, 
  isToday, 
  addLabel, 
  selectedDate, 
  showUnplannedTasks, 
  allowSelectDate = false, 
  deleteLabel,
  isEdit,
  onRepeatChange
}: TaskFormProps) {
  // Helper Function (moved to the top)
  const getNthWeek = (date: Date | null): 'First' | 'Second' | 'Third' | 'Fourth' | 'Last' => {
    if (!date) return 'First';
    const day = getDate(date);
    if (day >= 1 && day <= 7) return 'First';
    if (day >= 8 && day <= 14) return 'Second';
    if (day >= 15 && day <= 21) return 'Third';
    if (day >= 22 && day <= 28) return 'Fourth';
    return 'Last';
  }

  // State initializations
  const [selectedLabel, setSelectedLabel] = useState(initialTask?.label || 'none');
  const [newLabel, setNewLabel] = useState('');
  const [title, setTitle] = useState(initialTask?.title || '');
  const [memo, setMemo] = useState(initialTask?.memo || '');
  const [scheduledDate, setScheduledDate] = useState(
    initialTask?.scheduledDate || (allowSelectDate && selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '')
  );
  const [showRoutine, setShowRoutine] = useState(!!initialTask?.routine);

  const [intervalNumber, setIntervalNumber] = useState(initialTask?.routine?.interval.number || 1);
  const [intervalUnit, setIntervalUnit] = useState< 'day' | 'week' | 'month' | 'year' > (
    initialTask?.routine?.interval.unit || 'day'
  );
  
  const [routineStarts, setRoutineStarts] = useState(
    initialTask?.routine?.starts || (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'))
  );
  const [routineEndsType, setRoutineEndsType] = useState(initialTask?.routine?.ends.type || 'never');
  const [routineEndsValue, setRoutineEndsValue] = useState(
    (initialTask && initialTask.routine && initialTask.routine.ends.type === 'on')
      ? initialTask.routine.ends.value.toString()
      : (initialTask && initialTask.routine && initialTask.routine.ends.type === 'after')
      ? initialTask.routine.ends.value.toString()
      : ''
  );

  // Week Interval
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>(
    (initialTask && initialTask.routine && initialTask.routine.weekDays) || []
  );

  // Month Interval
  const [monthOption, setMonthOption] = useState(initialTask?.routine?.monthOption || 'day');
  const [selectedMonthDay, setSelectedMonthDay] = useState(
    initialTask?.routine?.monthDay || (selectedDate ? getDate(selectedDate).toString() : '1')
  );
  const [selectedMonthWeek, setSelectedMonthWeek] = useState< 'First' | 'Second' | 'Third' | 'Fourth' | 'Last' > (
    initialTask?.routine?.monthWeek || getNthWeek(selectedDate)
  );
  const [selectedMonthWeekDay, setSelectedMonthWeekDay] = useState(
    initialTask?.routine?.monthWeekDay || (selectedDate ? format(selectedDate, 'EEE') : 'Sun')
  );

  const [initialRoutine, setInitialRoutine] = useState<Routine | null>(initialTask?.routine || null);

  useEffect(() => {
    if (showUnplannedTasks && !initialTask) {
      setScheduledDate('')
    } else if (isToday && !initialTask) {
      setScheduledDate(format(new Date(), 'yyyy-MM-dd'));
    } else if (selectedDate && !initialTask) {
      setScheduledDate(format(selectedDate, 'yyyy-MM-dd'));
      if (showRoutine) {
        setRoutineStarts(format(selectedDate, 'yyyy-MM-dd'));

        // Pre-fill Choose Days based on selectedDate
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

        // Pre-fill Month Options based on selectedDate
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
          const weekdayStr = weekdayMap[getDay(selectedDate)];
          if (weekdayStr) {
            setSelectedMonthWeekDay(weekdayStr as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat');
          }

          // Pre-fill Day of Month based on selectedDate
          if (date <= daysInMonth) {
            setSelectedMonthDay(date.toString());
          } else {
            setSelectedMonthDay('Last');
          }
        }
      }
    }
  }, [isToday, initialTask, selectedDate, showUnplannedTasks, showRoutine, intervalUnit, selectedWeekDays]);

  useEffect(() => {
    if (intervalUnit === 'week' && selectedWeekDays.length === 0) {
      const date = initialTask?.scheduledDate ? new Date(initialTask.scheduledDate) : new Date();
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
  }, [intervalUnit, selectedWeekDays, initialTask]);

  const handleWeekDayChange = (day: string) => {
    setSelectedWeekDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    if (showRoutine) {
      if (routineEndsType === 'on' && routineEndsValue && routineStarts > routineEndsValue) {
        alert('End date must be after start date.');
        return;
      }
      if (routineEndsType === 'after' && (!routineEndsValue || parseInt(routineEndsValue) <= 0)) {
        alert('Number of occurrences must be a positive number.');
        return;
      }
    }

    const routine = showRoutine
      ? {
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
        }
      : null;

    const formData = {
      title,
      memo,
      status: initialTask?.status || 'planned',
      starred: initialTask?.starred || false,
      scheduledDate: scheduledDate || null,
      label: selectedLabel === 'none' ? null : selectedLabel,
      routine,
      newLabel: selectedLabel === 'new' ? newLabel : undefined,
    };

    onSubmit(formData);
  };

  // Detect changes in repeat settings
  useEffect(() => {
    if (!isEdit || !initialRoutine) return;

    const currentRoutine = showRoutine ? {
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
    } : null;

    // Check if repeat settings are being removed or modified
    const isRemoved = initialRoutine && !currentRoutine;
    const isModified = currentRoutine && JSON.stringify(initialRoutine) !== JSON.stringify(currentRoutine);

    if (onRepeatChange) {
      onRepeatChange(isRemoved || isModified);
    }
  }, [
    showRoutine,
    intervalNumber,
    intervalUnit,
    routineStarts,
    routineEndsType,
    routineEndsValue,
    selectedWeekDays,
    monthOption,
    selectedMonthDay,
    selectedMonthWeek,
    selectedMonthWeekDay,
    initialRoutine,
    onRepeatChange,
    isEdit
  ]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid w-full gap-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          name="title" 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="memo">Memo</Label>
        <Input 
          id="memo" 
          name="memo" 
          type="text" 
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>

      {!showRoutine && (
        <div className="grid w-full gap-2">
          <Label htmlFor="scheduledDate">Scheduled Date</Label>
          <Input 
            id="scheduledDate" 
            name="scheduledDate" 
            type="date" 
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </div>
      )}

      <div className="grid w-full gap-2">
        <Label htmlFor="label">Label</Label>
        <div className="flex flex-col space-y-2">
          <Select name="label" value={selectedLabel} onValueChange={setSelectedLabel}>
            <SelectTrigger>
              <SelectValue placeholder="Select label" />
            </SelectTrigger>
            <SelectContent>
              {labels.map(label => (
                <div key={label} className="flex items-center justify-between px-2">
                  <SelectItem value={label}>{label}</SelectItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (window.confirm(`Delete label "${label}"?`)) {
                        deleteLabel(label);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <SelectItem value="new">New Label</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          {selectedLabel === 'new' && (
            <Input 
              name="newLabel" 
              type="text" 
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Enter new label"
              required 
            />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          checked={showRoutine}
          onCheckedChange={(checked) => setShowRoutine(checked)}
          id="showRoutine"
        />
        <Label htmlFor="showRoutine">Repeat Task</Label>
      </div>

      {showRoutine && (
        <div className="border p-6 rounded space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="intervalNumber">Every</Label>
              <Input 
                id="intervalNumber" 
                name="intervalNumber" 
                type="number" 
                min="1"
                value={intervalNumber}
                onChange={(e) => setIntervalNumber(e.target.value)}
                required 
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="intervalUnit">Unit</Label>
              <Select name="intervalUnit" value={intervalUnit} onValueChange={setIntervalUnit}>
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

          {/* Remove Scheduled Date input when Repeat Task is active */}

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
              <RadioGroup value={monthOption} onValueChange={setMonthOption} className="flex space-x-4">
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
                  <Select name="monthWeek" value={selectedMonthWeek} onValueChange={setSelectedMonthWeek}>
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
                  <Select name="monthWeekDay" value={selectedMonthWeekDay} onValueChange={setSelectedMonthWeekDay}>
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
            <Select name="routineEndsType" value={routineEndsType} onValueChange={setRoutineEndsType}>
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
        </div>
      )}

      {/* Display the "Update Task" button only when editing a recurring task */}
      {(!initialTask?.isRecurring || !isEdit) && (
        <Button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</Button>
      )}
    </form>
  )
}