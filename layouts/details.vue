<script setup>
</script>


<template>
	<div class="w-screen h-screen bg-black relative font-noto">
		<div class="w-full h-full flex flex-row relative">
			<Sidebar />
			<div class="flex flex-col w-full h-full relative overflow-x-hidden">
				<MovieTitle/>
				<UserProfile  />
				<div class="ml-[256px] h-[100%]">
					<slot />
				</div>
			</div>
		</div>
		<UModals />
		<UNotifications />
	</div>
</template>


<style scoped>


</style>
