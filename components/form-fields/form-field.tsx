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
            required
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
            required
          />
        </div>
      );
    case 'number':
      const props = Object.assign(
        {},
        Number.isNaN(node.marker.max) ? null : { max: node.marker.max },
        Number.isNaN(node.marker.min) ? null : { min: node.marker.min },
        value === '' ? null : { value }
      );
      return (
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor={id}>{node.description}</Label>
          <Input
            type="number"
            id={id}
            placeholder={node.description}
            onChange={(e) => {
              setNodeValue(e.target.value);
            }}
            {...props}
            aria-describedby={id + '-num-desc'}
            required
          />
          {(props.max || props.min) && (
            <p id={id + '-num-desc'} className="text-sm text-muted-foreground">
              {node.marker.min ? 'Minimum: ' + node.marker.min : ''}{' '}
              {node.marker.max ? 'Maximum: ' + node.marker.max : ''}
            </p>
          )}
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
