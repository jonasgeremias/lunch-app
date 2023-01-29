import React from 'react'
import {InputLabel, MenuItem, FormControl, Select, FormHelperText} from '@mui/material'

/**
 * Menu input, with a floating list of options. Each element has an id and name value, passed by the items prop 
 */
const Menu = ({ value, label, name, items, onChange, fullWidth, size, nameKey='name', idKey='id', disabled, className, includeEmpty, error, helperText }) => (
    <FormControl id={`${name}_formcontrol`} variant="outlined" fullWidth={ fullWidth } size={ size } disabled={ disabled } className={ className } error={ error }>
        <InputLabel id={`${name}_label`}  error={ error }>
            { label }
        </InputLabel>
        <Select label={ label } name={name} error={ error } labelId={`${name}_label`} value={ value } onChange={ e => { onChange(e) }} disabled={ disabled }>
            { [...(includeEmpty ? [{ id: '', [nameKey]: 'Nenhum' }] : []), ...items].map(item =>
                <MenuItem id={item[idKey]} key={ item[idKey] } value={ item[idKey] }>{ item[nameKey] }</MenuItem>
            )}
        </Select>
        <FormHelperText error={ error }>{ helperText }</FormHelperText>
    </FormControl>
)

export default Menu