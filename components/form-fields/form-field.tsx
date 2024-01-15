import { RegularNode } from '@/lib/parser/node';
import { useId, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function FormField({ node }: { node: RegularNode }) {
  const [value, setValue] = useState<string | number>(node.value || node.marker.defaultValue || '');
  const setNodeValue = (value: string) => {
    node.value = value;
    setValue(value);
  };
  const id = useId();

  switch (node.type) {
    case 'text':
      return (
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor={id}>{node.description}</Label>
          <Input
            type="text"
            id={id}
            placeholder={node.description}
            value={value}
            onChange={(e) => {
              setNodeValue(e.target.value);
            }}
          />
        </div>
      );
    case 'content':
      return (
        <div className="grid w-full gap-1.5">
          <Label htmlFor={id}>{node.description}</Label>
          <Textarea
            placeholder={node.description}
            id={id}
            value={value}
            onChange={(e) => setNodeValue(e.target.value)}
          />
        </div>
      );
    case 'number':
      return (
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor={id}>{node.description}</Label>
          <Input
            type="number"
            id={id}
            placeholder={node.description}
            value={value}
            max={node.marker.max}
            min={node.marker.min}
            onChange={(e) => {
              setNodeValue(e.target.value);
            }}
          />
        </div>
      );
    case 'select':
      return (
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label>{node.description}</Label>
          <RadioGroup onValueChange={(val) => setNodeValue(val)} required>
            {node.marker.options!.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={id + '-' + index} />
                <Label htmlFor={id + '-' + index}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
  }
}
