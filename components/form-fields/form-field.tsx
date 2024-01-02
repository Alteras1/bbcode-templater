import { RegularNode } from '@/lib/parser/node';
import { useState } from 'react';

export default function FormField({ node }: { node: RegularNode }) {
  const [value, setValue] = useState<string | number>(
    node.value || node.marker.defaultValue || ''
  );
  const setNodeValue = (value: string) => {
    node.value = value;
    setValue(value);
  };

  switch (node.type) {
    case 'text':
      return (
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-lg">{node.description}</span>
          </div>
          <input
            type="text"
            placeholder={node.description}
            className="input input-bordered w-full max-w-xs"
            value={value}
            onChange={(e) => {
              setNodeValue(e.target.value);
            }}
          />
        </label>
      );
    case 'content':
      return (
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-lg">{node.description}</span>
          </div>
          <textarea
            placeholder={node.description}
            className="textarea textarea-bordered w-full max-w-xs"
            value={value}
            onChange={(e) => setNodeValue(e.target.value)}
          />
        </label>
      );
    case 'number':
      return (
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-lg">{node.description}</span>
          </div>
          <input
            type="number"
            placeholder={node.description}
            className="input input-bordered w-full max-w-xs"
            value={value}
            max={node.marker.max}
            min={node.marker.min}
            onChange={(e) => setNodeValue(e.target.value)}
          />
        </label>
      );

    case 'select':
      return (
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-lg">{node.description}</span>
          </div>
          <select
            className="select select-bordered w-full max-w-xs"
            value={value}
            onChange={(e) => setNodeValue(e.target.value)}
          >
            {node.marker.options!.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
  }
  return <div>{JSON.stringify(node)}</div>;
}
