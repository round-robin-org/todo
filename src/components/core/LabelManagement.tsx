import React, { useState } from 'react'
import { Button } from "@src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@src/components/ui/dialog"
import { Input } from "@src/components/ui/input"
import { Trash2 } from 'lucide-react'

type LabelManagementProps = {
  labels: string[];
  addLabel: (newLabel: string) => void;
  deleteLabel: (label: string) => void;
}

export function LabelManagement({ labels, addLabel, deleteLabel }: LabelManagementProps) {
  const [isManageLabelsOpen, setIsManageLabelsOpen] = useState(false)
  const [newLabel, setNewLabel] = useState('')

  const handleAddLabel = () => {
    if (newLabel.trim() !== '') {
      addLabel(newLabel.trim())
      setNewLabel('')
    }
  }

  const handleDeleteLabel = (label: string) => {
    if (window.confirm(`Are you sure you want to delete the label "${label}"?`)) {
      deleteLabel(label)
    }
  }

  return (
    <Dialog open={isManageLabelsOpen} onOpenChange={setIsManageLabelsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Manage Labels
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Labels</DialogTitle>
          <DialogDescription>
            Add or remove labels.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex space-x-2">
            <Input 
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="New label name"
            />
            <Button onClick={handleAddLabel}>Add</Button>
          </div>
          <ul className="space-y-2">
            {labels.map(label => (
              <li key={label} className="flex items-center justify-between">
                <span>{label}</span>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDeleteLabel(label)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
            {labels.length === 0 && <li>No labels.</li>}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
} 