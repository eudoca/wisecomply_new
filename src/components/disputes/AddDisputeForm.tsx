import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { AlertTriangleIcon, CalendarIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import type { DisputeCase, CaseType } from '../../types/dispute';

interface AddDisputeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCase: DisputeCase) => void;
}

type AddCaseFormData = {
    type: 'complaint' | 'dispute' | 'misconduct' | '';
    submittedBy: string;
    submittedAgainst: string;
    openedDate: Date | undefined;
    summary: string;
    relevantRule?: string;
};

type FormErrors = Partial<Record<keyof AddCaseFormData | 'form', string>>;

const AddDisputeForm: React.FC<AddDisputeFormProps> = ({ isOpen, onClose, onSave }) => {
  const initialState: AddCaseFormData = {
    type: '',
    submittedBy: '',
    submittedAgainst: '',
    openedDate: undefined,
    summary: '',
    relevantRule: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.type) newErrors.type = 'Case type is required.';
    if (!formData.submittedBy.trim()) newErrors.submittedBy = 'Complainant(s) name is required.';
    if (!formData.submittedAgainst.trim()) newErrors.submittedAgainst = 'Respondent(s) name is required.';
    if (!formData.openedDate) newErrors.openedDate = 'Date lodged is required.';
    if (!formData.summary.trim()) newErrors.summary = 'Summary of the issue is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value as AddCaseFormData['type'] }));
    if (errors.type) {
      setErrors(prev => ({ ...prev, type: undefined }));
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, openedDate: date }));
    if (errors.openedDate) {
      setErrors(prev => ({ ...prev, openedDate: undefined }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      const caseDataToSave: DisputeCase = {
        id: uuidv4(),
        caseType: formData.type as CaseType,
        status: 'lodged',
        complainants: formData.submittedBy.split('\n').map(s => s.trim()).filter(Boolean),
        respondents: formData.submittedAgainst.split('\n').map(s => s.trim()).filter(Boolean),
        dateLodged: format(formData.openedDate!, 'yyyy-MM-dd'),
        summary: formData.summary,
        relevantRule: formData.relevantRule || undefined,
      };
      try {
          onSave(caseDataToSave);
          onClose();
      } catch (error) {
          console.error("Failed to save case:", error);
          setErrors(prev => ({ ...prev, form: "Failed to save the case. Please try again." }));
      } finally {
          setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Dispute Case</DialogTitle>
        </DialogHeader>

        {errors.form && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errors.form}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="type">Case Type *</Label>
              <Select name="type" value={formData.type} onValueChange={handleSelectChange}>
                <SelectTrigger id="type" className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="dispute">Dispute</SelectItem>
                  <SelectItem value="misconduct">Misconduct</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="openedDate">Date Lodged *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="openedDate"
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!formData.openedDate && "text-muted-foreground"} ${errors.openedDate ? 'border-red-500' : ''}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.openedDate ? format(formData.openedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.openedDate}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date: Date) => date > new Date() }
                  />
                </PopoverContent>
              </Popover>
              {errors.openedDate && <p className="text-red-500 text-xs mt-1">{errors.openedDate}</p>}
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="submittedBy">Complainant(s) *</Label>
            <Textarea
              id="submittedBy"
              name="submittedBy"
              value={formData.submittedBy}
              onChange={handleChange}
              placeholder="Enter names, one per line if multiple"
              className={errors.submittedBy ? 'border-red-500' : ''}
              rows={2}
            />
            {errors.submittedBy && <p className="text-red-500 text-xs mt-1">{errors.submittedBy}</p>}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="submittedAgainst">Respondent(s) *</Label>
            <Textarea
              id="submittedAgainst"
              name="submittedAgainst"
              value={formData.submittedAgainst}
              onChange={handleChange}
              placeholder="Enter names, one per line if multiple"
              className={errors.submittedAgainst ? 'border-red-500' : ''}
              rows={2}
            />
            {errors.submittedAgainst && <p className="text-red-500 text-xs mt-1">{errors.submittedAgainst}</p>}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="summary">Summary of Issue *</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Briefly describe the core issue or allegation"
              className={errors.summary ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="relevantRule">Relevant Rule/Clause (Optional)</Label>
            <Input
              type="text"
              id="relevantRule"
              name="relevantRule"
              value={formData.relevantRule || ''}
              onChange={handleChange}
              placeholder="e.g., Clause 12.3"
              className={errors.relevantRule ? 'border-red-500' : ''}
            />
            {errors.relevantRule && <p className="text-red-500 text-xs mt-1">{errors.relevantRule}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button type="button" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Case'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDisputeForm; 