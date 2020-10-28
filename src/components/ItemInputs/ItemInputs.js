import React from "react"
import { Input, Required, Label} from '../Form/Form';
const ItemInputs = (props) => {

       // this.searchBoxRef.current.focus()
    
    return (
        props.items.map((val, idx)=> {
            let itemId = `item-${idx}`
            return(
                <div key={idx}htmlFor={`${itemId}-name`}>
                    <Label htmlFor={`${itemId}-name`}>{`Item #${idx + 1}`}<Required /></Label>
                    <Input

                        id={`${itemId}-name`}
                        name={itemId}
                        className='name'
                        placeholder='ex) Baby Clothes'
                        onChange={props.handleItemChange}
                        value={props.items[idx].name}
                        required
                    />
                    <Label htmlFor={`${itemId}-amount`}>
                        What is the location's desired amount of this?<Required />
                    </Label>
                    <Input
                        id={`${itemId}-amount`}
                        type='number'
                        min= '5'
                        max= '999'
                        name='critical_amount'
                        className='critical_amount'
                        placeholder='ex) 100'
                        onChange={props.handleItemChange}
                        value={props.items[idx].critical_amount}
                        required
                    />
                </div>
            )
        })
    )
}
export default ItemInputs