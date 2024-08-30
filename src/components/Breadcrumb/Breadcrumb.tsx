import React, { FC } from 'react';
import './Breadcrumb.scss';


type Props = {
  label: string;
}

const Breadcrumb: FC<Props> = ({ label }) => {
    return (
        <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-separator">{`>`}</span>
            <span className="breadcrumb-item">Project</span>
            <span className="breadcrumb-separator">{`>`}</span>
            <span className="breadcrumb-item current">{label}</span>
        </div>
    );
};

export default Breadcrumb;
