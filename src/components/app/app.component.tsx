import React from 'react';
import '../../styles/index.scss';
import PageContainer from '../pageContainer/pageContainer.component';

export default function App(): React.ReactElement {
  return (
    <PageContainer>
      <div className="card">
        <aside className="sidebar">
          <dl>
            <dt>1. Choose your user</dt>
            <dd>Select</dd>
          </dl>
          <dl>
            <dt>2. Choose your Channel</dt>
            <dd>Channels</dd>
          </dl>
        </aside>
      </div>
    </PageContainer>
  );
}
