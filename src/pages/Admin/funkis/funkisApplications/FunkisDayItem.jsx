
import React from 'react';
import { Checkbox } from '@rmwc/checkbox';
import {
  ListItem,
  ListItemGraphic,
} from '@rmwc/list';

export const FunkisDayItem = ({
  timeSpan,
  onClick,
  checked,
  index,
}) => {
return (
  <ListItem onClick={onClick} id={`funkis-day-alt-${index}`}>
    <ListItemGraphic icon={<Checkbox checked={checked}/>}/>
    {timeSpan}
  </ListItem>
);
}