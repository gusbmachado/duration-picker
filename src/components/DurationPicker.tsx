import * as React from "react";
import { Box, Button, TextField, ClickAwayListener } from "@mui/material";
import { Stack } from "@mui/system";
import { IoIosTimer } from "react-icons/io";

export interface DurationPickerProps {
  value: number;
  setValue: (value: number) => void;
  onSubmit: () => void;
}

export function secondsToHms(seconds: number, sep = ':'): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(sep);
}

export function hmsToSeconds(hms: string): number {
  const match = hms.match(/(\d\d?):(\d\d?):(\d\d?)/);
  if (!match) {
    return 0;
  }
  const [h, m, s] = match.slice(1);
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

const DurationPicker: React.FC<DurationPickerProps> = ({value, setValue, onSubmit}) => {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const [hours, setHours] = React.useState(secondsToHms(value).slice(0, 2));
  const [minutes, setMinutes] = React.useState(secondsToHms(value).slice(3, 5));
  const [seconds, setSeconds] = React.useState(secondsToHms(value).slice(6, 8));

  React.useEffect(() => {
    const formData = hours + ':' + minutes + ':' + seconds;
    setValue(hmsToSeconds(formData));
  }, [hours, minutes, seconds, setValue]);

  const isNumber = (str: string) => /^[0-9]*$/.test(str);

  const inputValue = (str: string) => {
    if (Number(str) < 10) {
      if (('0' + str).length > 2) {
        return str;
      }
      else return '0' + str;
    } else return str;
  }

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <Box sx={{ position: "relative", left: '500px', width: '206px' }}>
        <Stack sx={{width: '206px', maxHeight: '42px', backgroundColor: "#2a2b31", borderRadius: "4px"}}>
        <TextField
          sx={{
            position: "relative",
            left: '10px',
            backgroundColor: "#2a2b31",
            border: "none",
            maxWidth: "140px",
            maxHeight: '42px',
            fontFamily: "Nunito, sans-serif",
            fontSize: "24px",
            verticalAlign: 'top',
            "& .MuiInputBase-input, MuiOutlinedInput-input": {
              padding: '9.5px 14px',
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none"
            },
            "& .MuiInputLabel-root": {
              color: "#808080"
            },
            "& .MuiOutlinedInput-input": {
              color: "#808080"
            }
          }}
          variant="outlined"
          type="text"
          value={inputValue(hours) + ':' + inputValue(minutes) + ':' + inputValue(seconds)}
        />
        <IoIosTimer style={{
            position: 'absolute',
            top: '7px',
            left: '160px',
            fontSize: '24px',
            color: "#1d2024",
        }} onClick={handleClick} />
        </Stack>
        {open ? (
          <Stack
            sx={{
              position: 'relative',
              top: '12px',
              left: '-90px',
              backgroundColor: "#2a2b31",
              width: "389px",
              height: "256px",
              borderRadius: "4px",
              marginInline: "auto"
            }}
          >
            <Box
              component="form"
              sx={{
                position: "relative",
                bottom: "-35px",
                color: "#808080",
                fontFamily: "Nunito, sans-serif",
                marginInline: "auto",
                "& > :not(style)": { m: 1, width: "25ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <label>Enter Time</label>
              <br />
              <TextField
                sx={{
                  backgroundColor: "#2a2b31",
                  borderRadius: "4px",
                  maxWidth: "96px",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "24px",
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#09416C"
                  },
                  "& .MuiInputLabel-root": {
                    color: "#808080"
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#808080"
                  }
                }}
                variant="outlined"
                type="text"
                name="hours"
                value={hours}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNumber(value) && Number(value) <= 23) {
                    setHours(value);
                  }
                }}
                inputProps={{ maxlength: "2" }}
              />
              <TextField
                sx={{
                  backgroundColor: "#2a2b31",
                  borderRadius: "4px",
                  maxWidth: "96px",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "24px",
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#09416C"
                  },
                  "& .MuiInputLabel-root": {
                    color: "#808080"
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#808080"
                  }
                }}
                variant="outlined"
                type="text"
                name="minutes"
                value={minutes}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNumber(value) && Number(value) <= 59) {
                    setMinutes(value);
                  }
                }}
                inputProps={{ maxlength: "2" }}
              />
              <TextField
                sx={{
                  backgroundColor: "#2a2b31",
                  borderRadius: "4px",
                  maxWidth: "96px",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "24px",
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#09416C"
                  },
                  "& .MuiInputLabel-root": {
                    color: "#808080"
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#808080"
                  }
                }}
                variant="outlined"
                type="text"
                name="seconds"
                value={seconds}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNumber(value) && Number(value) <= 59) {
                    setSeconds(value);
                  }
                }}
                inputProps={{ maxlength: "2" }}
              />
              <br />
              <label>Hours</label>&emsp;&emsp;&emsp;&nbsp;
              <label>Minutes</label>&emsp;&emsp;&nbsp;
              <label>Seconds</label>
            </Box>
            <Box
              component="form"
              sx={{
                position: "relative",
                bottom: "-65px",
                left: "25px",
                "& > :not(style)": { m: 1, width: "2ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <Button
                sx={{
                  color: "#09416C",
                  maxWidth: "96px",
                  "& .MuiButtonBase-root": {
                    maxWidth: "96px"
                  }
                }}
                variant="text"
                onClick={() => {
                  setHours('00');
                  setMinutes('00');
                  setSeconds('00');
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  color: "#09416C",
                  maxWidth: "96px",
                  "& .MuiButtonBase-root": {
                    maxWidth: "96px"
                  }
                }}
                variant="text"
                onClick={onSubmit}
              >
                Save
              </Button>
            </Box>
          </Stack>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}

export default DurationPicker;
