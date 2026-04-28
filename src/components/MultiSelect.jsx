import { useMemo, useState } from "react";
import { Dropdown, Form, Button, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";

export default function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState(options);
  const [newOption, setNewOption] = useState("");

  const selectedLabels = useMemo(() => {
    return localOptions
      .filter((opt) => value.includes(opt.value))
      .map((opt) => opt.label);
  }, [localOptions, value]);

  const handleToggleOption = (optionValue) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleSelectAll = () => {
    if (value.length === localOptions.length) {
      onChange([]);
    } else {
      onChange(localOptions.map((opt) => opt.value));
    }
  };

const handleAddOption = () => {
  const trimmed = newOption.trim();

  if (!trimmed) return;

  const exists = localOptions.some(
    (opt) => opt.label.toLowerCase() === trimmed.toLowerCase()
  );

  if (exists) return;

  const newItem = {
    label: trimmed,
    value: trimmed.toLowerCase().replace(/\s+/g, "-"),
    isCustom: true,
  };

  setLocalOptions([...localOptions, newItem]);
  onChange([...value, newItem.value]);
  setNewOption("");
};

const handleRemoveOption = (optionValue) => {
  setLocalOptions(localOptions.filter((opt) => opt.value !== optionValue));
  onChange(value.filter((v) => v !== optionValue));
};

  return (
    <Dropdown
      className="custom-multiselect"
      show={open}
      onToggle={(isOpen) => {
        if (!disabled) {
          setOpen(isOpen);
        }
      }}
      autoClose="outside"
    >
      <Dropdown.Toggle
        as="div"
        className="custom-multiselect-toggle form-control d-flex justify-content-between align-items-center"
        style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.7 : 1 }}
      >
        <span
          className={`text-truncate ${
            selectedLabels.length ? "text-dark" : "text-muted"
          }`}
        >
          {selectedLabels.length > 0
            ? selectedLabels.join(", ")
            : placeholder}
        </span>

        <div className="plus-multiselect">
          <FaPlus size={12} />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100 p-2">
        <InputGroup size="sm" className="mb-2">
          <Form.Control
            value={newOption}
            placeholder="Add new option"
            disabled={disabled}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();

              if (e.key === "Enter") {
                e.preventDefault();
                handleAddOption();
              }
            }}
          />

          <Button
            variant="outline-secondary"
            onClick={handleAddOption}
            disabled={disabled || !newOption.trim()}
          >
            Add
          </Button>
        </InputGroup>

        <Form.Check
          type="checkbox"
          label="Select all"
          checked={
            localOptions.length > 0 && value.length === localOptions.length
          }
          disabled={disabled}
          onChange={handleSelectAll}
          className="mb-2"
        />

      <Dropdown.Divider />

       {localOptions.map((option) => (
  <div
    key={option.value}
    className="d-flex justify-content-between align-items-center mb-1"
  >
    <Form.Check
      type="checkbox"
      label={option.label}
      checked={value.includes(option.value)}
      disabled={disabled}
      onChange={() => handleToggleOption(option.value)}
    />

    {option.isCustom && (
      <Button
        size="sm"
        variant="link"
        className="text-danger p-0"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveOption(option.value);
        }}
        disabled={disabled}
      >
        <IoTrashOutline />
      </Button>
    )}
  </div>
))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
