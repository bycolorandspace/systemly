import { Slider } from "../ui/slider";
import { StopLossRange } from "@/helpers/calculators/risk-calculators";

interface sliderProp {
  value: number[];
  range: StopLossRange;
  onSliderValueCommit?: (value: number[]) => void;
}

export default function SliderInput({
  value,
  range,
  onSliderValueCommit,
}: sliderProp) {
  const handleValueChange = (value: number[]) => {
    console.log("VALUE: ", value);
  };
  return (
    <Slider
      value={value}
      onValueChange={handleValueChange}
      onValueCommit={onSliderValueCommit}
      defaultValue={[range.default]}
      min={range.min}
      max={range.max}
      step={range.step}
    />
  );
}
