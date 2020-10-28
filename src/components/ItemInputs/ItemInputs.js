import React from "react"
import { Input, Required, Label} from '../Form/Form';
const ItemInputs = (props) => {

       // this.searchBoxRef.current.focus()
    
    return (
        props.items.map((val, idx)=> {
            let itemId = `item-${idx}`
            return(
                <div key={idx} htmlFor={`${itemId}`}>
                    <Label htmlFor={`${itemId}-name`}>{`Item #${idx + 1}`}<Required /></Label>
                    <Input
                        id={`${itemId+1}-name`}
                        name={itemId+1}
                        className="name"
                        onChange={ev => props.handleItemChange(ev, idx, 'name')}
                        placeholder='ex) Baby Clothes'
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
                        onChange={ev => props.handleItemChange(ev, idx, 'critical_amount')}
                        placeholder='ex) 100'
                        required
                    />
                </div>
            )
        })
    )
}
export default ItemInputs