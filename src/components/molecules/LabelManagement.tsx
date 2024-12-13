import React, { useState } from 'react'
import { Button } from "@src/components/atoms/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@src/components/atoms/dialog"
import { Input } from "@src/components/atoms/input"
import { Trash2, Edit2 } from 'lucide-react'

type LabelManagementProps = {
  labels: string[];
  addLabel: (newLabel: string) => void;
  deleteLabel: (label: string) => void;
  editLabel: (oldLabel: string, newLabel: string) => void;
}

export function LabelManagement({ labels, addLabel, deleteLabel, editLabel }: LabelManagementProps) {
  const [isManageLabelsOpen, setIsManageLabelsOpen] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [editingLabel, setEditingLabel] = useState<string | null>(null)
  const [editedLabel, setEditedLabel] = useState('')

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

  const handleEditLabel = (label: string) => {
    setEditingLabel(label)
    setEditedLabel(label)
  }

  const handleSaveEditedLabel = () => {
    if (editedLabel.trim() !== '' && editingLabel) {
      editLabel(editingLabel, editedLabel.trim())
      setEditingLabel(null)
      setEditedLabel('')
    }
  }

  const handleCancelEdit = () => {
    setEditingLabel(null)
    setEditedLabel('')
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
            Add, remove, or edit labels.
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
                {editingLabel === label ? (
                  <div className="flex items-center space-x-2 w-full">
                    <Input 
                      className="flex-1"
                      value={editedLabel}
                      onChange={(e) => setEditedLabel(e.target.value)}
                      placeholder="Edit label name"
                    />
                    <Button onClick={handleSaveEditedLabel}>Save</Button>
                    <Button variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                  </div>
                ) : (
                  <>
                    <span>{label}</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditLabel(label)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteLabel(label)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
            {labels.length === 0 && <li>No labels.</li>}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
} 