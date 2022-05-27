import React, { useState, useRef } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    let items = props.initialData;
    if (props.sorting === 'ASC') {
        items = items.sort((a, b) => a.id - b.id);
    } else {
        items = items.sort((a, b) => b.id - a.id);
    }
    return (
        <ol>
            {items.map((item) => (
                <ItemLi key={item.id} item={item} />
            ))}
        </ol>
    );
}

function ItemLi(props: { item: IItem }) {
    const [initial, setInitial] = useState(props.item.name);
    const [status, setStatus] = useState(false);
    const input = useRef<HTMLInputElement>(null);

    const keysEvents = (pressedKey: React.KeyboardEvent<HTMLInputElement>) => {
        if (pressedKey.key === 'Enter') {
            setInitial(input.current?.value || '');
            setStatus(false);
        }
        if (pressedKey.key === 'Escape') {
            setStatus(false);
        }
    };

    return !status ? (
        <li onClick={() => setStatus(true)}>{initial}</li>
    ) : (
        <li key={props.item.id}>
            <input ref={input} onKeyDown={keysEvents} defaultValue={initial} />
        </li>
    );
}
