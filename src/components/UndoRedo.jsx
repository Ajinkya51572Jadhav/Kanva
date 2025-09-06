import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import { setEditorPages } from '../redux/editorReducer';


export default function UndoRedo({ pushHistory }) {
    const dispatch = useDispatch();

    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    const historyRef = useRef([]);
    const historyIndexRef = useRef(-1);
    const suppressPushRef = useRef(false);


    useEffect(() => {
        if (suppressPushRef?.current) return;
        try {
            const snap = JSON.parse(JSON.stringify(pushHistory));
            const h = historyRef?.current?.slice(0, historyIndexRef?.current + 1);
            h?.push(snap);
            historyRef.current = h;
            historyIndexRef.current = h?.length - 1;
            setCanUndo(historyIndexRef?.current > 0);
            setCanRedo(false);
        } catch (err) {
        }
    }, [pushHistory]);



    const undo = () => {
        if (historyIndexRef?.current <= 0) return;
        const newIndex = historyIndexRef?.current - 1;
        const snap = historyRef?.current[newIndex];
        historyIndexRef.current = newIndex;
        suppressPushRef.current = true;
        dispatch(setEditorPages(snap));
        setCanUndo(newIndex > 0);
        setCanRedo(true);
        setTimeout(() => (suppressPushRef.current = false), 0);
    };

    const redo = () => {
        if (historyIndexRef?.current >= historyRef?.current?.length - 1) return;
        const newIndex = historyIndexRef?.current + 1;
        const snap = historyRef?.current[newIndex];
        historyIndexRef.current = newIndex;
        suppressPushRef.current = true;
        dispatch(setEditorPages(snap));
        setCanUndo(true);
        setCanRedo(newIndex < historyRef?.current?.length - 1);
        setTimeout(() => (suppressPushRef.current = false), 0);
    };

    return (
        <>
            <Tooltip title="Undo" color='gold'>
                <Button type='link' icon={<LuUndo />} onClick={undo} disabled={!canUndo} />
            </Tooltip>
            <Tooltip title="Redo" color='orange'>
                <Button type='link' icon={<LuRedo />} onClick={redo} disabled={!canRedo} />
            </Tooltip>

        </>
    )
}
