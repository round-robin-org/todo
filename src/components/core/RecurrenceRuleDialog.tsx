'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@src/components/ui/dialog"
import { Routine } from '@src/lib/types'
import { RecurrenceRuleForm } from './RecurrenceRuleForm'

type RecurrenceRuleDialogProps = {
  initialRoutine?: Routine | null;
  selectedDate?: Date | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (routine: Routine) => void;
}

export function RecurrenceRuleDialog({
  initialRoutine,
  selectedDate,
  open,
  onClose,
  onSubmit
}: RecurrenceRuleDialogProps) {
  const handleSubmit = (routine: Routine) => {
    onSubmit(routine);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Recurrence Rule</DialogTitle>
          <DialogDescription>
            Configure how often this task should repeat.
          </DialogDescription>
        </DialogHeader>
        <RecurrenceRuleForm
          initialRoutine={initialRoutine}
          selectedDate={selectedDate}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
} 