import {Modal, Input} from 'antd';

import {queryNode} from "../../../services/chart/api";
import React from "react";
import styles from "../index.less";
import {ProductItem} from "../../../components/search/ProductItem";
import {Autocomplete} from "../../../components/search/Autocomplete";

const Search = ({changeId, onSelect, visible, onConfirm, ...rest}) => {

  return <Modal
    {...rest}
    footer={null}
    closeIcon={<div/>}
    destroyOnClose
    visible={visible}
    className={styles.modal}
  >
    <Autocomplete
      debug={true}
      placeholder={"✎...一期一会，世当珍惜～"}
      autoFocus
      detachedMediaQuery='none'
      queryNode={queryNode}
      onSelect={onSelect}
      getSources={
        async ({query}) => {
          const data = await queryNode(query);
          return [
            {
              sourceId: 'predictions',
              getItems() {
                return data.data;
              },
              templates: {
                item({item}) {
                  return <ProductItem hit={item} onClick={onSelect}/>;
                },
                noResults() {
                  return <div>
                    查不到结果: <b>"{query}"</b>
                  </div>
                }
              },
            },
          ]
        }
      }
    />
  </Modal>
}


export default Search;
