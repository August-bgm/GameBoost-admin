import { getConfigKey } from '@/api/system/config';
/**
 * 获取字典数据
 */
export const useDict = (...args: string[]): { [key: string]: DictDataOption[] } => {
  const res = ref<{
    [key: string]: DictDataOption[];
  }>({});

  args.forEach(async (dictType) => {
    res.value[dictType] = [];
    await getConfigKey(dictType).then((resp) => {
        res.value[dictType] = JSON.parse(resp.data).map(
            (p): DictDataOption => ({ label: p.label, value: p.value,elTagType: p.style })
        )
    });
  });
  return res.value;
};
