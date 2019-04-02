<template>
    <div></div>
</template>
<script>
    import Database from '../providers/Database';
    import faker from 'faker';

    let store = new Database();

    export default {
        name: "Wipe",
        created() {
            const count = this.$route.params.count;
            let data = (new Date()).getTime();
            for (let i = 0; i < count; ++i) {
                data = data + i;
                store.addItemToStore(data, {
                    value: faker.name.firstName(0),
                    id: i,
                    complete: faker.random.arrayElement(['Y', 'N']),
                    priority: faker.random.arrayElement(['L', 'M', 'H'])
                });
            }
            this.$router.push('/');
        }
    }
</script>