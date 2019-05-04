import React from 'react';
import { IMapProps } from './IMapProps';
import { IMapState } from './IMapState';

export default class Map extends React.Component<IMapProps, IMapState> {

  constructor(props:IMapProps) {
    super(props);
  }

  public render(): React.ReactElement<IMapProps> {
    return (
      <div>
        {/* {this.state.mapOpen ? <iframe width="100%" height="520" src="https://cartoworkshops.carto.com/u/ecooltra-carto-01/builder/4b38cdf3-14ff-4874-abd9-604bc815cb7a/embed"></iframe> : null } */}
        <iframe width="100%" height="700" src="https://cartoworkshops.carto.com/u/ecooltra-carto-01/builder/4b38cdf3-14ff-4874-abd9-604bc815cb7a/embed"  allowFullScreen></iframe>
      </div>
    );
  }

  //public componentWillReciveProps(newProps: IMapProps){
  //    this.setState({mapOpen: newProps.mapOpen});
  //}

}