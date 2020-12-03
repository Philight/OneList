import React, { useContext } from "react";
import styled from 'styled-components';

import { PlaylistContext, PlaylistDispatchContext } from './../contexts/PlaylistContext';
import CloudIcon from './CloudIcon';

import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import { faListUl, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlaylistContainer = styled.ul`
	list-style-type: square;
	padding: 0;
	margin: 0;
	height: 54%;
	width: 100%;
	
	color: black;
	background-color:white;
	//border: 1px solid blue;

	overflow-y: scroll;
	margin-bottom: 5%;
`

const Record = styled.li`
	height: 10%;

	display: flex;
	justify-content: space-between;
	align-items: center;

	border-bottom: 1px solid rgb(var(--silvercolor2));
`


const DragWrapper = styled.span`
`

const IconWrapper = styled.span`
	margin: 0 15px;
	color: rgb(var(--secondarycolor));
`

const cloudIconStyle = {
	css: `
		color: rgb(var(--tertiarycolor));
		margin-left: 6px;
	`,
}

const MinusIconWrapper = styled.span`
	margin: 0 15px;
	color: rgb(var(--secondarycolor));
	cursor: pointer; 
	&:hover {
		color: #cc0000;
	}

	font-size: 16px;

`

const FlexStart = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;

	font-size: 16px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`


const ListItem = ( {record, index, deleteRecord} ) => {
	return (
		<Draggable index={index} draggableId={record.id}>		
		{(provided) => (
			<Record ref={provided.innerRef} {...provided.draggableProps}>
				<FlexStart>
					<IconWrapper>
						<DragWrapper {...provided.dragHandleProps}><FontAwesomeIcon icon={faListUl} /></DragWrapper> 
						<CloudIcon 
							url={record.url} 
							source={record.source} 
							hover
							styleCSS={cloudIconStyle.css} 
						/>
					</IconWrapper>
					{index+1}. {`${record && record.artists[0].name} - ${record.name}`}
				</FlexStart>
				<MinusIconWrapper onClick={() => deleteRecord(index)}><FontAwesomeIcon icon={faMinusCircle} /></MinusIconWrapper>
			</Record>
		)}
		</Draggable>
	)
};

const SideBarBody = (props) => {
	const playlist = useContext(PlaylistContext);
	const setPlaylist = useContext(PlaylistDispatchContext);

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};
	const onDragEnd = (result) => {
	    if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
     		return;
    	}

    	const reOrderedList = reorder(
    		playlist,
    		result.source.index,
    		result.destination.index
    	);

    	setPlaylist(reOrderedList);
	};

	const handleDeleteRecord = (itemIndex) => {
		const shortenedList = Array.from(playlist);
		shortenedList.splice(itemIndex, 1);

		setPlaylist(shortenedList);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="records">
			{(provided) => (
				<PlaylistContainer {...provided.droppableProps} ref={provided.innerRef}>
					{ playlist.map((record, index) => 
						<ListItem 
							deleteRecord={handleDeleteRecord}
							record={record} 
							index={index} 
							key={record.id} 
						/>
					) }
					{provided.placeholder}						
				</PlaylistContainer>
			)}		
			</Droppable>				
		</DragDropContext>
	)
};

export default SideBarBody;